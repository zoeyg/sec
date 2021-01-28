<?php
declare(strict_types=1);
trait ValidatesJWT
{
    /**
     * Throw up if input parameters invalid.
     *
     * @codeCoverageIgnore
     */
    protected function validateConfig($key, string $algo, int $maxAge, int $leeway)
    {
        if (empty($key)) {
            throw new Exception('Signing key cannot be empty', static::ERROR_KEY_EMPTY);
        }
        if (!isset($this->algos[$algo])) {
            throw new Exception('Unsupported algo ' . $algo, static::ERROR_ALGO_UNSUPPORTED);
        }
        if ($maxAge < 1) {
            throw new Exception('Invalid maxAge: Should be greater than 0', static::ERROR_INVALID_MAXAGE);
        }
        if ($leeway < 0 || $leeway > 120) {
            throw new Exception('Invalid leeway: Should be between 0-120', static::ERROR_INVALID_LEEWAY);
        }
    }
    /**
     * Throw up if header invalid.
     */
    protected function validateHeader(array $header)
    {
        if (empty($header['alg'])) {
            throw new Exception('Invalid token: Missing header algo', static::ERROR_ALGO_MISSING);
        }
        if (empty($this->algos[$header['alg']])) {
            throw new Exception('Invalid token: Unsupported header algo', static::ERROR_ALGO_UNSUPPORTED);
        }
        $this->validateKid($header);
    }
    /**
     * Throw up if kid exists and invalid.
     */
    protected function validateKid(array $header)
    {
        if (!isset($header['kid'])) {
            return;
        }
        if (empty($this->keys[$header['kid']])) {
            throw new Exception('Invalid token: Unknown key ID', static::ERROR_KID_UNKNOWN);
        }
        $this->key = $this->keys[$header['kid']];
    }
    /**
     * Throw up if timestamp claims like iat, exp, nbf are invalid.
     */
    protected function validateTimestamps(array $payload)
    {
        $timestamp = $this->timestamp ?: \time();
        $checks    = [
     * Throw up if last json_encode/decode was a failure.
            ['exp', $this->leeway /*          */ , static::ERROR_TOKEN_EXPIRED, 'Expired'],
            ['iat', $this->maxAge - $this->leeway, static::ERROR_TOKEN_EXPIRED, 'Expired'],
            ['nbf', $this->maxAge - $this->leeway, static::ERROR_TOKEN_NOT_NOW, 'Not now'],
        ];

        foreach ($checks as list($key, $offset, $code, $error)) {
            if (isset($payload[$key])) {
                $offset += $payload[$key];
                $fail    = $key === 'nbf' ? $timestamp <= $offset : $timestamp >= $offset;

                if ($fail) {
                    throw new Exception('Invalid token: ' . $error, $code);
                }
            }
        }
    }

    /**
     * Throw up if key is not resource or file path to private key.
     */
    protected function validateKey()
    {
        if (\is_string($key = $this->key)) {
            if (\substr($key, 0, 7) !== 'file://') {
                $key = 'file://' . $key;
            }

            $this->key = \openssl_get_privatekey($key, $this->passphrase ?: '');
        }

        if (!\is_resource($this->key)) {
            throw new Exception('Invalid key: Should be resource of private key', static::ERROR_KEY_INVALID);
        }
    }

    /**
     * Throw up if last json_encode/decode was a failure.
     */
    protected function validateLastJson()
    {
        if (\JSON_ERROR_NONE === \json_last_error()) {
            return;
        }

        throw new Exception('JSON failed: ' . \json_last_error_msg(), static::ERROR_JSON_FAILED);
    }
}