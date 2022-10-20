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
          '(choreID INTEGER NOT NULL PRIMARY KEY, choreInfo TEXT NOT NULL, choreCost REAL NOT NULL);',
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
          ' (choreInfo, choreCost) VALUES (?,?),(?,?),(?,?),(?,?),(?,?),(?,?),(?,?),(?,?),(?,?),(?,?),(?,?);',
        // Here would be all the values
        [
          'Clean kitchen',
          5,
          'Clean livingroom',
          2,
          'Clean bathroom',
          7,
          'Clean your room',
          9,
          'Clean backyard',
          10,
          'Vacuum the whole house',
          53,
          'Do dishes',
          52,
          'Fill dishwasher',
          1,
          'Empty dishwasher',
          3,
          'Hang clothes',
          8,
          'Take the thrash out',
          4,
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

export const addChild = (cUser, cPass, cMoney) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Making password more secure, not plain text
      sha256(cPass).then(hash => {
        hashed = hash;
        // Prepared statement with placeolders
        tx.executeSql(
          'insert into ' +
            childTable +
            ' (childUsername, childPassword, childMoney) values(?,?,?);',
          // Values for the placeholders
          [cUser, hashed, cMoney],
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
  });
  return promise;
};

export const getParentUser = user => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Selecting only parentID with given name
      tx.executeSql(
        'SELECT parentID, parentUsername, parentMoney FROM ' +
          parentTable +
          ' WHERE parentUsername = "' +
          user +
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

export const getChildId = user => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Selecting only childID with given name
      tx.executeSql(
        'SELECT childID FROM ' +
          childTable +
          ' WHERE childUsername = "' +
          user +
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
          ' SET parentMoney = '+ pMoney +' WHERE parentId =' + parentID +';',
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

// Only for testing
export const all = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we select all from the table fish
      tx.executeSql(
        'select * from ' + choresTable,
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
