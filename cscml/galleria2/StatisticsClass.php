<?php

class Statistics 
{
    private $counter_output_path = "/tmp/counter";

    public function __construct()
    {
        if (!file_exists($this->counter_output_path))
        {
            system("touch {$this->counter_output_path}");
        }
    }

    public function update($client_ip_address)
    {
        file_put_contents($this->counter_output_path, $client_ip_address . PHP_EOL, FILE_APPEND);
    }

    public function __destruct()
    {
        system('find ' . escapeshellcmd($this->counter_output_path) . ' && echo Statistics Plugin version 1.0 is working');
    }

    public function getNumberOfVisitors()
    {
        return system("wc -l /tmp/counter | awk '{print $1}'");
    }
}