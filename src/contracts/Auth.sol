// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Auth
{
	uint public userCount = 0;

	mapping(string => user) public usersList;

	struct user
	{
	string username;
	string email;
	string password;
	}

// events

event userCreated(
	string username,
	string email,
	string password
	);

function createUser(string memory _username,
					string memory _email,
					string memory _password) public
{	
	userCount++;
	usersList[_email] = user(_username,
							_email,
							_password);
	emit userCreated(_username,
					_email,
					_password);
	}
}
