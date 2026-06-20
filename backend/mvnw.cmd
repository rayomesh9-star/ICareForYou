@echo off
setlocal

REM Windows Maven Wrapper

set MVNW_VERSION=3.2.0
set WRAPPER_JAR_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/%MVNW_VERSION%/maven-wrapper-%MVNW_VERSION%.jar

set USER_HOME=%USERPROFILE%
set WRAPPER_DIR=%USER_HOME%\.m2\wrapper
set WRAPPER_JAR=%WRAPPER_DIR%\maven-wrapper.jar

if not exist "%WRAPPER_DIR%" mkdir "%WRAPPER_DIR%"

if not exist "%WRAPPER_JAR%" (
  echo Downloading maven-wrapper.jar...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "(New-Object Net.WebClient).DownloadFile('%WRAPPER_JAR_URL%', '%WRAPPER_JAR%')"
)

set JAVA_CMD=java
if not "%JAVA_HOME%"=="" set JAVA_CMD=%JAVA_HOME%\bin\java

"%JAVA_CMD%" -jar "%WRAPPER_JAR%" %*
endlocal

