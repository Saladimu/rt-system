# Contributing to Sistem Aktivitas RT

Thank you for your interest in contributing to the RT System! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Create a new branch for your feature: `git checkout -b feature/new-feature`
3. Make your changes and commit them: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## Development Setup

1. Clone your forked repository:
   ```bash
   git clone https://github.com/your-username/rt-system.git
   cd rt-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Google Sheet ID and credentials path

4. Set up Google Sheets API:
   - Follow the instructions in the README.md to set up Google Cloud Console
   - Download credentials.json and place it in the root directory

5. Run the application:
   ```bash
   npm start
   ```

## Code Style Guidelines

- Use consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code structure and patterns
- Use ES6+ JavaScript features

## Testing

Currently, the project uses basic Jest tests. To run tests:
```bash
npm test
```

## Pull Request Process

1. Ensure your code follows the style guidelines
2. Update documentation if needed
3. Add tests for new features
4. Make sure all existing tests pass
5. Provide a clear description of your changes in the PR

## Reporting Issues

If you find any bugs or have suggestions for improvements, please:
1. Check if the issue already exists
2. Create a new issue with a clear title and description
3. Include steps to reproduce the bug if applicable
4. Provide expected vs actual behavior

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.