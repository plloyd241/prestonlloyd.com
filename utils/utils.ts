

export function getPort() {
    let port = process.env['APP_PORT'] || 3000;

    if (!isNaN(port) && port >= 0) {
        return port
    }

    throw new Error('Port is NaN or is zero')
}
