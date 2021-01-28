require 'winrm'

conn = WinRM::Connection.new(
  endpoint: 'http://10.10.10.193:5985/wsman',
  user: 'svc-print',
  password: '$fab@s3Rv1ce$1',
)

command=""

conn.shell(:powershell) do |shell|
    until command == "exit\n" do
        print "PS > "
        command = gets        
        output = shell.run(command) do |stdout, stderr|
            STDOUT.print stdout
            STDERR.print stderr
        end
    end    
    puts "Exiting with code #{output.exitcode}"
end