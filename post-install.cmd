@echo off
for %%i in (selenium_easy.cmd) do call :Foo %%~$PATH:i

:Foo
if not [%1]==[] (
	set var=%1
REM    assoc .js=%var%
	assoc .js=c:\windows\system32\calc.exe
)