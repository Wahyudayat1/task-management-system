class User {
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdAt = new Date();
    }

    getDisplayName() {
        return this.username || this.email;
    }
}

module.exports = User;