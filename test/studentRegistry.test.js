const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("StudentRegistry", function () {
  let studentRegistryFactory, studentRegistry;

  beforeEach(async function () {
    studentRegistryFactory = await ethers.getContractFactory("StudentRegistry");
    studentRegistry = await studentRegistryFactory.deploy();
    await studentRegistry.deployed();
  });

  it("Should allow a student to register", async function () {
    const [owner] = await ethers.getSigners();
    const name = "John Doe";
    const age = 20;
    const course = "Blockchain 101";

    // Register the student
    const transactionResponse = await studentRegistry.register(
      name,
      age,
      course
    );
    await transactionResponse.wait(1);

    // Verify the addressToStudentId mapping
    const studentId = await studentRegistry.addressToStudentId(owner.address);
    console.log("Student ID:", studentId.toString());
    assert.notEqual(
      studentId.toString(),
      "0",
      "Student ID should not be zero after registration"
    );

    // Verify the student's data
    const studentData = await studentRegistry.connect(owner).viewMyData();
    console.log("Student Data:", studentData);

    assert.equal(studentData[0], name);
    assert.equal(studentData[1].toString(), age.toString());
    assert.equal(studentData[2], course);
  });

  it("Should not allow a student to register twice", async function () {
    const [owner] = await ethers.getSigners();
    const name = "John Doe";
    const age = 20;
    const course = "Blockchain 101";

    // Attempt to register the student for the first time
    await studentRegistry.register(name, age, course);

    // Attempt to register the same student for the second time and verify it fails
    await expect(
      studentRegistry.register(name, age, course)
    ).to.be.revertedWith("Student is already registered.");
  });

  it("Should allow viewing all students' information", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const student1 = { name: "John Doe", age: 20, course: "Blockchain 101" };
    const student2 = { name: "Jane Smith", age: 22, course: "Solidity 202" };

    // Register two students
    await studentRegistry
      .connect(owner)
      .register(student1.name, student1.age, student1.course);
    await studentRegistry
      .connect(addr1)
      .register(student2.name, student2.age, student2.course);

    const allStudents = await studentRegistry.viewAllStudents();
    console.log("All Students:", allStudents);

    assert.equal(allStudents.length, 2);
    assert.equal(allStudents[0].name, student1.name);
    assert.equal(allStudents[0].age.toString(), student1.age.toString());
    assert.equal(allStudents[0].course, student1.course);

    assert.equal(allStudents[1].name, student2.name);
    assert.equal(allStudents[1].age.toString(), student2.age.toString());
    assert.equal(allStudents[1].course, student2.course);
  });

  it("Should allow a registered student to view their data", async function () {
    const [owner] = await ethers.getSigners();
    const name = "John Doe";
    const age = 20;
    const course = "Blockchain 101";

    await studentRegistry.register(name, age, course);
    const studentData = await studentRegistry.connect(owner).viewMyData();

    console.log("Student Data:", studentData);

    assert.equal(studentData[0], name);
    assert.equal(studentData[1].toString(), age.toString());
    assert.equal(studentData[2], course);
  });

  it("Should not allow unregistered student to view their data", async function () {
    const [owner, addr1] = await ethers.getSigners();

    // Ensure addr1 is not registered
    await expect(
      studentRegistry.connect(addr1).viewMyData()
    ).to.be.revertedWith("Student is not registered.");
  });

  it("Should emit StudentRegistered event when a student registers", async function () {
    const [owner] = await ethers.getSigners();
    const name = "John Doe";
    const age = 20;
    const course = "Blockchain 101";

    // Register the student and verify the event
    await expect(studentRegistry.register(name, age, course))
      .to.emit(studentRegistry, "StudentRegistered")
      .withArgs(owner.address, name, age, course);
  });

  it("Should not allow registration with empty name", async function () {
    const [owner] = await ethers.getSigners();
    const name = "";
    const age = 20;
    const course = "Blockchain 101";

    // Attempt to register a student with an empty name and verify it fails
    await expect(
      studentRegistry.register(name, age, course)
    ).to.be.revertedWith("Name cannot be empty.");
  });

  it("Should not allow registration with age zero", async function () {
    const [owner] = await ethers.getSigners();
    const name = "John Doe";
    const age = 0;
    const course = "Blockchain 101";

    // Attempt to register a student with age zero and verify it fails
    await expect(
      studentRegistry.register(name, age, course)
    ).to.be.revertedWith("Age must be greater than zero.");
  });
});
