class User {
  constructor(email) {
    this.email = email;
  }
}

class UserBuilder {
  constructor(email) {
    this.user = new User(email);
  }

  setId(id) {
    this.user.id = id;
    return this;
  }

  setName(name) {
    this.user.name = name;
    return this;
  }

  setLastname(lastname) {
    this.user.lastname = lastname;
    return this;
  }

  setPassword(password) {
    this.user.password = password;
    return this;
  }

  setGroupId(groupId) {
    this.user.groupId = groupId;
    return this;
  }

  build() {
    return this.user;
  }
}

module.exports = {
  User: User,
  UserBuilder: UserBuilder,
};
