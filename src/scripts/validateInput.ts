export function validateInput(input: string) {
    // Implement your validation logic here
    // For example, check if the input is not empty and does not contain any special characters
    return input && /^[a-zA-Z0-9]*$/.test(input);
}