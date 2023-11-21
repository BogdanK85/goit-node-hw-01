// const fs = require("fs/promises");
// const path = require("path");
// import { nanoid } from "nanoid";
// import { promises as fsPromises } from "fs";
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error read contacts", error.message);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error("Error get contact by ID:", error.message);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContactsIndex = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (updatedContactsIndex.length === contacts.length) {
      return null;
    }

    const [deletedContact] = contacts.splice(updatedContactsIndex, 1);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactsIndex, null, 2)
    );
    return deletedContact;
  } catch (error) {
    console.error("Error remove contact", error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error add contact", error.message);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  updatedContactsIndex,
  addContact,
  removeContact,
};
