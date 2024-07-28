// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract StudentRegistry {
    
    // Student structure
    struct Student {
        address studentAddress;
        string name;
        uint age;
        string course;
    }
    
    // List of students
    Student[] public students;
    
    // Mapping to find a student by their address
    mapping(address => uint) public addressToStudentId;
    
    // Event for when a student registers
    event StudentRegistered(address indexed studentAddress, string name, uint age, string course);
    
    // Function to register in the list
    function register(string memory _name, uint _age, string memory _course) public {
        // Check that the student is not already registered
        require(addressToStudentId[msg.sender] == 0, "Student is already registered.");
        
        // **NEW**: Check that the name is not empty
        require(bytes(_name).length > 0, "Name cannot be empty.");
        
        // **NEW**: Check that the age is greater than zero
        require(_age > 0, "Age must be greater than zero.");

        // Create a new student
        Student memory newStudent = Student({
            studentAddress: msg.sender,
            name: _name,
            age: _age,
            course: _course
        });
        
        // Add the new student to the list
        students.push(newStudent);
        
        // Save the student's id in the mapping
        addressToStudentId[msg.sender] = students.length;
        
        // Emit the registration event
        emit StudentRegistered(msg.sender, _name, _age, _course);
    }
    
    // Function to check a student's data by their address
    function viewMyData() public view returns (string memory name, uint age, string memory course) {
        // Check that the student is registered
        require(addressToStudentId[msg.sender] != 0, "Student is not registered.");
        
        // Get the student's id
        uint id = addressToStudentId[msg.sender] - 1;
        
        // Return the student's data
        Student memory student = students[id];
        return (student.name, student.age, student.course);
    }
    
    // Function to view all students' information
    function viewAllStudents() public view returns (Student[] memory) {
        return students;
    }
}
