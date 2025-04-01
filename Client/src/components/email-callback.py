def callback(commit):
    if commit.committer_email == b"nikita@Nikitas-MacBook-Air.local":
        commit.committer_email = b"rawat96nikita@gmail.com"
        commit.author_email = b"rawat96nikita@gmail.com"