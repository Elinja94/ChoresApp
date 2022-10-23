//Sonja and Jenna, but some of them are modified from teacher's code
import React from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {sha256} from 'react-native-sha256';

var db = openDatabase({name: 'choresapp.db'});
db.executeSql('PRAGMA foreign_keys = ON;');
var parentTable = 'parents';
var childTable = 'children';
var choresTable = 'chores';
var childParentTable = 'childparent';
var childChoreTable = 'childchore';
var hashed = '';
// Creating tables to the database and adding data to chores table by Sonja
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // If you want to clear any table
      //tx.executeSql('DROP TABLE IF EXISTS parents', [])
      // Parents table
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          parentTable +
          '(parentID INTEGER NOT NULL PRIMARY KEY, parentUsername VARCHAR(30) NOT NULL UNIQUE, parentPassword varchar(200) NOT NULL, parentMoney REAL);',
        // Here would be all the values
        [],
        // If the transaction succeeds, this is called
        () => {
          resolve();
        },
        // If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );

      // Children table
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          childTable +
          '(childID INTEGER NOT NULL PRIMARY KEY, childUsername VARCHAR(30) NOT NULL UNIQUE, childPassword varchar(200) NOT NULL, childMoney REAL);',
        // Here would be all the values
        [],
        // If the transaction succeeds, this is called
        () => {
          resolve();
        },
        // If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );

      // Removing chores table
      tx.executeSql('DROP TABLE IF EXISTS chores', []);
      // Chores table
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          choresTable +
          '(choreID INTEGER NOT NULL PRIMARY KEY, choreInfo TEXT NOT NULL);',
        // Here would be all the values
        [],
        // If the transaction succeeds, this is called
        () => {
          resolve();
        },
        // If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );

      // Children's parents table or Parents' children table
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          childParentTable +
          '(childparentID INTEGER NOT NULL PRIMARY KEY, child INTEGER NOT NULL REFERENCES children(childID), parent INTEGER NOT NULL REFERENCES parents(parentID));',
        // Here would be all the values
        [],
        // If the transaction succeeds, this is called
        () => {
          resolve();
        },
        // If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );

      // Children's chores table
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          childChoreTable +
          '(childchoreID INTEGER NOT NULL PRIMARY KEY, child INTEGER NOT NULL REFERENCES children(childID), chore INTEGER NOT NULL REFERENCES chores(choreID), done BOOLEAN);',
        // Here would be all the values
        [],
        // If the transaction succeeds, this is called
        () => {
          resolve();
        },
        // If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );

      // Adding data to chores table
      tx.executeSql(
        'INSERT INTO ' +
          choresTable +
          ' (choreInfo) VALUES (?),(?),(?),(?),(?),(?),(?),(?),(?),(?),(?);',
        // Here would be all the values
        [
          'Clean kitchen',
          'Clean livingroom',
          'Clean bathroom',
          'Clean your room',
          'Clean backyard',
          'Vacuum the whole house',
          'Do dishes',
          'Fill dishwasher',
          'Empty dishwasher',
          'Hang clothes',
          'Take the thrash out',
        ],
        // If the transaction succeeds, this is called
        () => {
          resolve();
        },
        // If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

// Checking the login information for parent by Sonja
export const loginCheckParent = (user, pass) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Making password more secure, not plain text
      sha256(pass).then(hash => {
        hashed = hash;
        // Selecting only password with given name
        tx.executeSql(
          'SELECT parentPassword FROM ' +
            parentTable +
            ' WHERE parentUsername = "' +
            user +
            '"',
          [],
          (tx, result) => {
            // Making sure there is user with given name
            var len = result.rows.length;
            if (len > 0) {
              // Setting row so we can check later if passwords match
              let row = result.rows.item(0);
              if (hashed === row.parentPassword) {
                // If password matches
                resolve('Ok');
              }
              // If password doesn't match
              resolve('No ok');
            }
            // If there is no account with given name
            resolve('No ac');
          },
          (tx, err) => {
            console.log('Err');
            console.log(err);
            reject(err);
          },
        );
      });
    });
  });
  return promise;
};

// Checking the login information for child by Sonja
export const loginCheckChild = (user, pass) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Making password more secure, not plain text
      sha256(pass).then(hash => {
        hashed = hash;
        // Selecting only password with given name
        tx.executeSql(
          'SELECT childPassword FROM ' +
            childTable +
            ' WHERE childUsername = "' +
            user +
            '"',
          [],
          (tx, result) => {
            // Making sure there is user with given name
            var len = result.rows.length;
            if (len > 0) {
              // Setting row so we can check later if passwords match
              let row = result.rows.item(0);
              if (hashed === row.childPassword) {
                // If password matches
                resolve('Ok');
              }
              // If password doesn't match
              resolve('No ok');
            }
            // If there is no account with given name
            resolve('No ac');
          },
          (tx, err) => {
            console.log('Err');
            console.log(err);
            reject(err);
          },
        );
      });
    });
  });
  return promise;
};

// Parent registration by Sonja
export const addParent = (pUser, pPass) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Checking for empty fields
      if (pPass.length === 0) {
        resolve('Empty');
        return promise;
      }
      if (pUser.length === 0) {
        resolve('Empty');
        return promise;
      } else {
        // Making password more secure, not plain text
        sha256(pPass).then(hash => {
          hashed = hash;
          // Checking if username is used
          tx.executeSql(
            'SELECT * FROM ' +
              parentTable +
              ' WHERE parentUsername = "' +
              pUser +
              '"',
            [],
            (tx, result) => {
              var len = result.rows.length;
              // If username is free
              if (len === 0) {
                // Prepared statement with placeolders
                tx.executeSql(
                  'INSERT INTO ' +
                    parentTable +
                    ' (parentUsername, parentPassword, parentMoney) VALUES (?,?,?);',
                  // Values for the placeholders
                  [pUser, hashed, 0],
                  // If the transaction succeeds, this is called
                  () => {
                    resolve('Ok');
                    return promise;
                  },
                  // If the transaction fails, this is called
                  (_, err) => {
                    reject(err);
                  },
                );
              }
              // If username is taken
              else {
                resolve('Already');
              }
            },
            (tx, err) => {
              console.log('Err');
              console.log(err);
              reject(err);
            },
          );
        });
      }
    });
  });
  return promise;
};

// Child registration by Jenna
export const addChild = (cUser, cPass) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      if (cPass.length === 0) {
        resolve('Empty');
        return promise;
      }
      if (cUser.length === 0) {
        resolve('Empty');
        return promise;
      }
      sha256(cPass).then(hash => {
        hashed = hash;
        // Checking if username is used
        tx.executeSql(
          'SELECT * FROM ' +
            childTable +
            ' WHERE childUsername = "' +
            cUser +
            '"',
          [],
          (tx, result) => {
            var len = result.rows.length;
            // If username is free
            if (len === 0) {
              tx.executeSql(
                'insert into ' +
                  childTable +
                  ' (childUsername, childPassword, childMoney) values(?,?,?);',
                [cUser, hashed, 0],
                () => {
                  resolve('Ok');
                  return promise;
                },
                (_, err) => {
                  reject(err);
                },
              );
            }
            // If username is taken
            else {
              resolve('Username already taken');
            }
          },
          (tx, err) => {
            reject(err);
          },
        );
      });
    });
  });
  return promise;
};

// Get parent user by Jenna
export const getParentUser = username => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT parentID, parentUsername, parentMoney FROM ' +
          parentTable +
          ' WHERE parentUsername = "' +
          username +
          '"',
        [],
        (tx, result) => {
          // Making sure there is user with given name
          var len = result.rows.length;
          if (len > 0) {
            let row = result.rows.item(0);
            resolve(row);
          }
          // If there is no account with given name
          resolve('No ac');
        },
        (tx, err) => {
          console.log('Err');
          console.log(err);
          reject(err);
        },
      );
    });
  });
  return promise;
};

// Parents changing password to their account by Jenna
export const updatePassword = (parentID, pPass) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      if (pPass.length === 0) {
        resolve('Password length must be over 0 characters');
        return promise;
      }
      sha256(pPass).then(hash => {
        hashed = hash;
        tx.executeSql(
          'UPDATE ' +
            parentTable +
            ' SET parentPassword = "' +
            hashed +
            '"' +
            ' WHERE parentID =' +
            parentID +
            ';',
          [],
          () => {
            resolve();
          },
          // If the transaction fails, this is called
          (_, err) => {
            reject(err);
          },
        );
      });
    });
  });
  return promise;
};

// Connect child to parent (when registering a child) by Jenna
export const addChildParentConnection = (childID, parentID) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Prepared statement with placeolders
      tx.executeSql(
        'insert into ' + childParentTable + ' (child, parent) values(?,?);',
        // Values for the placeholders
        [childID, parentID],
        // If the transaction succeeds, this is called
        () => {
          resolve();
        },
        // If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

// Get child ID by Jenna
export const getChildID = username => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Selecting only childID with given username
      tx.executeSql(
        'SELECT childID FROM ' +
          childTable +
          ' WHERE childUsername = "' +
          username +
          '"',
        [],
        (tx, result) => {
          // Making sure there is user with given name
          var len = result.rows.length;
          if (len > 0) {
            let row = result.rows.item(0);
            resolve(row);
          }
          // If there is no account with given name
          resolve('No ac');
        },
        (tx, err) => {
          console.log('Err');
          console.log(err);
          reject(err);
        },
      );
    });
  });
  return promise;
};

// Get child username by Jenna
export const getChild = childID => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT childID, childUsername FROM ' +
          childTable +
          ' WHERE childID = "' +
          childID +
          '"',
        [],
        (tx, result) => {
          var len = result.rows.length;
          if (len > 0) {
            let row = result.rows.item(0);
            resolve(row);
          }
          resolve('No ac');
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

// Get all childrens ID's for parent by Jenna
export const getAllChildrenForParent = parentID => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select child from ' +
          childParentTable +
          ' WHERE parent = "' +
          parentID +
          '"',
        [],
        (tx, result) => {
          let childIDs = [];
          for (let i = 0; i < result.rows.length; i++) {
            childIDs.push(result.rows.item(i).child);
          }
          resolve(childIDs);
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

// Parents adding money to their account
export const updateMoney = (parentID, pMoney) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Updating money for parent who is logged in
      tx.executeSql(
        'UPDATE ' +
          parentTable +
          ' SET parentMoney = ' +
          pMoney +
          ' WHERE parentId =' +
          parentID +
          ';',
        [],
        // If the transaction succeeds, this is called
        () => {
          resolve();
        },
        // If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

// Get all chores by Jenna
export const getAllChores = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select choreID, choreInfo from ' + choresTable,
        [],
        (tx, result) => {
          let chores = [];
          for (let i = 0; i < result.rows.length; i++) {
            chores.push(result.rows.item(i));
          }
          resolve(chores);
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

// Add chore by Jenna
export const addChore = (childID, choreID) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Prepared statement with placeolders
      tx.executeSql(
        'insert into ' +
          childChoreTable +
          ' (child, chore, done) values(?,?, ?);',
        // Values for the placeholders
        [childID, choreID, false],
        // If the transaction succeeds, this is called
        () => {
          resolve();
        },
        // If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

// Only for testing
export const all = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we select all from the table fish
      tx.executeSql(
        'select * from ' + parentTable,
        [],
        (tx, result) => {
          let items = []; //Create a new empty Javascript array
          //And add all the items of the result (database rows/records) into that table
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i)); //The form of an item is {"breed": "Pike", "id": 1, "weight": 5000}
            console.log(result.rows.item(i)); //For debugging purposes to see the data in console window
          }
          resolve(items); //The data the Promise will have when returned
        },
        (tx, err) => {
          console.log('Err');
          console.log(err);
          reject(err);
        },
      );
    });
  });
  return promise;
};
