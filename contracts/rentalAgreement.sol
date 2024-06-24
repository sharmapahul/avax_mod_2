// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract RentalAgreement {
    address public landlord;
    address public tenant;
    uint256 public rentAmount;
    uint256 public dueDate;
    uint256 public lateFee;
    bool public rentPaid;

    event RentPaid(address indexed tenant, uint256 amount, uint256 date);
    event LateFeePaid(address indexed tenant, uint256 amount, uint256 date);

    modifier onlyLandlord() {
        require(msg.sender == landlord, "Only landlord can call this function");
        _;
    }

    modifier onlyTenant() {
        require(msg.sender == tenant, "Only tenant can call this function");
        _;
    }

    constructor(address _tenant, uint256 _rentAmount, uint256 _dueDate, uint256 _lateFee) {
        landlord = msg.sender;
        tenant = _tenant;
        rentAmount = _rentAmount;
        dueDate = _dueDate;
        lateFee = _lateFee;
        rentPaid = false;
    }

    function payRent() public payable onlyTenant {
        require(msg.value >= rentAmount, "Insufficient rent amount");
        require(block.timestamp <= dueDate, "Rent is past due");
        rentPaid = true;
        payable(landlord).transfer(msg.value);
        emit RentPaid(msg.sender, msg.value, block.timestamp);
    }

    function payRentWithLateFee() public payable onlyTenant {
        require(block.timestamp > dueDate, "Rent is not past due yet");
        require(msg.value >= rentAmount + lateFee, "Insufficient amount including late fee");
        rentPaid = true;
        payable(landlord).transfer(msg.value);
        emit LateFeePaid(msg.sender, msg.value, block.timestamp);
    }

    function resetRentStatus(uint256 _newDueDate) public onlyLandlord {
        dueDate = _newDueDate;
        rentPaid = false;
    }
}
