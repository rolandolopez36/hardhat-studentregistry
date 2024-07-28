### README for StudentRegistry Project

---

## StudentRegistry

StudentRegistry is a smart contract developed in Solidity that allows for the registration of students, viewing of their data, and emits events upon registration. This project is designed to operate on the Ethereum blockchain.

## Features

- **Student Registration**: Allows registering a new student.
- **View Personal Data**: Allows a registered student to view their own data.
- **View All Students**: Allows viewing information of all registered students.
- **Event Emission**: Emits an event when a student is registered.

## Requirements

- Node.js
- Hardhat

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rolandolopez36/hardhat-studentregistry.git
   cd hardhat-studentregistry
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

## Usage

### Deploy the Contract

1. Compile the contract:

   ```bash
   yarn hardhat compile
   ```

2. Deploy the contract to the desired network (example: Sepolia):

   ```bash
   yarn hardhat deploy --network sepolia
   ```

### Run Tests

1. Execute the tests:

   ```bash
   yarn hardhat test
   ```

## Contribution

Contributions are welcome. Please open an issue or pull request to discuss any significant changes.

## License

This project is licensed under the MIT License.

---

Thank you for using StudentRegistry!
