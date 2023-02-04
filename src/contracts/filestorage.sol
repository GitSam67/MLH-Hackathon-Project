// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FileStorage {
    
    event Uploaded(
        uint256 Id,
        string Hash,
        uint256 Size,
        string Type,
        string Name,
        uint256 uploadTime,
        address uploader
    );

    
    struct File {
        uint256 Id;
        string Hash;
        uint256 Size;
        string Type;
        string Name;
        uint256 uploadTime;
        address uploader;
    }

    uint256 public Count = 0;
    mapping(address => File[]) public files;

    // Upload File function
    function uploadFile(
        string memory _Hash,
        uint256 _Size,
        string memory _Type,
        string memory _Name
    ) public {
        // Make sure the file hash exists
        require(bytes(_Hash).length > 0);
        require(bytes(_Type).length > 0);
        require(bytes(_Name).length > 0);
        require(msg.sender != address(0));
        require(_Size > 0);

        Count++;

        files[msg.sender].push(File(
            Count,
            _Hash,
            _Size,
            _Type,
            _Name,
            block.timestamp,
            msg.sender
        ));

        // Trigger an event
        emit Uploaded(
            Count,
            _Hash,
            _Size,
            _Type,
            _Name,
            block.timestamp,
            msg.sender
        );
    }
}
