#!/usr/bin/python

from Registry import Registry

from regipy.registry import RegistryHive
reg = RegistryHive('Registry.pol')

# Iterate over a registry hive recursively:
for entry in reg.rec_subkeys(as_json=True):
    print(entry)

# Iterate over a key and get all subkeys and their modification time:
for sk in reg.get_key('Software').get_subkeys():
    print(sk.name, convert_wintime(sk.header.last_modified).isoformat())

# Get values from a specific registry key:
reg.get_key('Software\Microsoft\Internet Explorer\BrowserEmulation').get_values(as_json=True)

# Use plugins:
from regipy.plugins.ntuser.ntuser_persistence import NTUserPersistencePlugin
NTUserPersistencePlugin(reg, as_json=True).run()

# Run all supported plugins on a registry hive:
run_relevant_plugins(reg, as_json=True)