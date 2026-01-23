MongoDB Notes – Introduction
Overview

This document captures my initial introduction to MongoDB, focusing on installation, core concepts, and basic data modeling approaches. The goal was to understand MongoDB fundamentals before writing application-level code.

Installation & Setup

Installed MongoDB locally

Encountered an issue where the mongod / mongosh command was not recognized

Resolved the issue by adding MongoDB’s bin directory to the system PATH

Verified the installation by successfully running mongosh

Key takeaway:
Correct environment configuration is critical before working with any database system.

Core MongoDB Concepts
Database

A database is the top-level container in MongoDB.
It holds multiple collections and logically groups related data.

Example:

school_db

ecommerce_db

Collection

A collection exists within a database and holds multiple documents.
It is similar to a table in relational databases, but without a fixed schema.

Example:

users

orders

products

Document

A document is a single record stored in a collection.
Documents are stored in BSON (Binary JSON) format and can have flexible structures.

Example fields:

name

email

age

createdAt

Data Modeling Approaches
Embedding

Embedding stores related data inside a single document.

Use when:

Data is frequently accessed together

One-to-few relationships

Performance and read efficiency are important

Example use cases:

User profile with address details

Blog post with comments

Referencing

Referencing stores related data in separate collections and links them using IDs.

Use when:

Data is large or reused frequently

One-to-many or many-to-many relationships

Data needs to be updated independently

Example use cases:

Users and orders

Students and courses

Key Differences Summary
Concept	Description
Database	Container for collections
Collection	Group of related documents
Document	Individual record in BSON format
Conclusion

This introductory session focused on:

Installing MongoDB and fixing environment issues

Understanding MongoDB’s structure and terminology

Learning foundational data modeling strategies

These fundamentals provide a strong base for moving into CRUD operations and backend application development.