<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

class Database extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create database based on environment variables';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $database = env('db_database');
        $user = env('db_username');
        $pass = env('db_password');
        $host = env('db_host');
        $driver = Config::get('database.default');
        $this->info($driver);

        switch($driver){
            case 'mysql':
            case 'pgsql':
            $dsn = "{$driver}:host={$host};";
                break;
            case 'sqlsrv':
                $dsn = "{$driver}:server={$host};";
                break;
            case 'sqlite':
                if (file_exists(storage_path('database.sqlite'))){
                    unlink(storage_path('database.sqlite'));
                }
                $handle = fopen(storage_path('database.sqlite'), 'w');
                fclose($handle);
                $this->info("SQLite Database created successfully");
                break;
            default:
                $this->error("Invalid database driver:{drivers}");
                $driver = 'sqlite';
        }

        if($driver !== 'sqlite'){
            try{
                $conn = new \PDO($dsn, $user, $pass,[
                    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
                ]);
                $conn->exec('DROP DATABASE IF EXISTS ' . $database);
                $conn->exec('CREATE DATABASE IF NOT EXISTS ' . $database);
                $this->info("Database {$driver}:{$database} created successfully");
            } catch(\PEDOException $ex){
                $this->error($ex->getMessage());
            }
        }

    }
}
