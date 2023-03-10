const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactParse = JSON.parse(data);
  return contactParse;
}

async function getContactById(contactId) {
  const contactParse = await listContacts();
  const result = contactParse.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contactParse = await listContacts();
  const idx = contactParse.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contactParse.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contactParse[idx];
}

async function addContact(name, email, phone) {
  const contactParse = await listContacts();
  const newProduct = { name, email, phone, id: v4() };
  contactParse.push(newProduct);
  await fs.writeFile(contactsPath, JSON.stringify(contactParse));
  return newProduct;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};