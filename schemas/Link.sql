CREATE TABLE links (
    code TEXT PRIMARY KEY,
    target TEXT NOT NULL,
    uses INT NOT NULL DEFAULT 0
);