const express = require('express');
const fs = require('fs');
const path = require('path');

module.exports.AddingCsv = async ({ chatId, data}) => {

  if (!chatId || !data) {
    return { message: 'chatId and data are required' };
  }

  const filePath = path.join(__dirname, 'data', `chat_${chatId}.csv`);

  // Convert JSON data to CSV format
  const csvLine = `${data.user},${data.text},${data.chatId},${data.createdAt},${data.updatedAt}\n`;

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist, create it and write header
      const header = 'user,text,chatId,createdAt,updatedAt\n';
      fs.writeFile(filePath, header + csvLine, (err) => {
        if (err) {
          return  { message: 'Error creating file' };
        }
        return{ message: 'File created and data inserted' };
      });
    } else {
      // File exists, append data
      fs.appendFile(filePath, csvLine, (err) => {
        if (err) {
          return { message: 'Error appending data' };
        }
        return { message: 'Data inserted' };
      });
    }
  });
}