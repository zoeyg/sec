undefined8 FUN_0010121f(int param_1,long param_2)

{
  int iVar1;
  int iVar2;
  int iVar3;
  long in_FS_OFFSET;
  char local_218 [512];
  int local_18;
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  if (param_1 != 7) {
    puts("Not enough unicorn arguments given!");
    if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
      __stack_chk_fail();
    }
    return 0xffffffff;
  }
  local_18 = FUN_00101199(7,param_2,param_2);
  iVar1 = atoi(*(char **)(param_2 + 0x10));
  if ((0 < iVar1) && (iVar1 < 0x200)) {
    strcpy(local_218,*(char **)(param_2 + 8));
    iVar1 = strcmp(local_218,"pink");
    iVar2 = atoi(*(char **)(param_2 + 0x20));
    if ((0 < iVar2) && (iVar2 < 0x200)) {
      strcpy(local_218,*(char **)(param_2 + 0x18));
      iVar2 = strcmp(local_218,"fluffy");
      iVar3 = atoi(*(char **)(param_2 + 0x30));
      if ((0 < iVar3) && (iVar3 < 0x200)) {
        strcpy(local_218,*(char **)(param_2 + 8));
        iVar3 = strcmp(local_218,"dancing on rainbow");
        if (local_18 != 0) {
          puts("super duper special unicorn debug mode is initiated!");
          system("cat flag.txt");
                    /* WARNING: Subroutine does not return */
          exit(0);
        }
        if (((iVar2 == 0) && (iVar1 == 0)) && (iVar3 == 0)) {
          puts("You unicorn\'s details have been submitted, it is amazing\n");
        }
        else {
          puts("Something is wrong with your unicorn, unicorn submission is cancelled");
        }
                    /* WARNING: Subroutine does not return */
        exit(0);
      }
                    /* WARNING: Subroutine does not return */
      exit(-1);
    }
                    /* WARNING: Subroutine does not return */
    exit(-1);
  }
                    /* WARNING: Subroutine does not return */
  exit(-1);
}