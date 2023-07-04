const fs = require("fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

// шлях до файлу
const contactsPath = path.join(__dirname, "contacts.json");
// читання файлу
async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}
// запис файлу
async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}
// пошук контакта за id

async function getContactById(id) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    throw new Error("Контакт не знайдено");
  }
  return contact;
}

// повернення всіх контактів
async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}
// створення контакту
async function addContact(contact) {
  const contacts = await readContacts();

  crypto.randomUUID();

  const newContact = { ...contact, id: crypto.randomUUID() };

  contacts.push(newContact);

  await writeContacts(contacts);
 console.log(newContact)
  return newContact;
}
// оновлення контакту
async function updateContact(id, contact) {
  const contacts = await readContacts();
console.log(id)
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    throw new Error("Контакт не знайдено");
  }
  const newContact = [
    ...contacts.slice(0, index),
    { ...contact, id },
    ...contacts.slice(index + 1),
  ];

  await writeContacts(newContact);

  return { ...contact, id };
}
// видалення контакту
async function removeContact(id) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    throw new Error("Контакт не знайдено");
  }
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  await writeContacts(newContacts);
  return "Success";
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

