# repassgen
REadable PASSwords GENerator  
[![Code Climate](https://codeclimate.com/github/iskaldvind/repassgen/badges/gpa.svg)](https://codeclimate.com/github/iskaldvind/repassgen)
[![Test Coverage](https://codeclimate.com/github/iskaldvind/repassgen/badges/coverage.svg)](https://codeclimate.com/github/iskaldvind/repassgen/coverage)
[![Issue Count](https://codeclimate.com/github/iskaldvind/repassgen/badges/issue_count.svg)](https://codeclimate.com/github/iskaldvind/repassgen)
[![Build Status](https://travis-ci.org/iskaldvind/repassgen.svg?branch=master)](https://travis-ci.org/iskaldvind/repassgen)  

The aim is to generate passwords which are easy readable and feels like english words but meaningless in content.  
  
## Install
npm install -g repassgen  

## Synopsis  
```
$ repassgen [ --options | -o ] code
$ repassgen [ --help | -h ]
```
[`-o`](#optiontype--function) key could be omitted  
## Options
```
--help, -h
```
Running with this key or without any keys at all will display usage guide.
```
--options, -o
```
Options key could be ommited if the options code is provided. Options code must follow the template: (1\*)(2\*)(3\*), where:  
  1\* - integer value (min 1) of passwords amount to generate;  
  2\* - code letter from [aAnNsSfF] which corresponds:  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a - 'abcd', A - 'aBcD', n - 'a2c4', N - 'a2C4', s - 'a@c$', S - 'a@C$', f - 'a2c$', F - 'a2C$'  
  3\* - integer value (min 6) of passwords length to generate.

## Examples
```
$ repassgen -o 1a6
```
Will generate 1 password consisting of lowercase letters and length of 6.
```
$ repassgen 10N8
```
Will generate 10 passwords consisting of both lowercase and uppercase letters and numbers and length of 8.
```
$ repassgen
```
Will display usage guide.
