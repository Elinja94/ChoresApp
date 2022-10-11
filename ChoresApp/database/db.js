//Sonja, but some of them are modified from teacher's code
import React from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import {sha256} from 'react-native-sha256';

var db = openDatabase({ name: 'choresapp.db' });
db.executeSql('PRAGMA foreign_keys = ON;');
var parentTable="parents";
var childTable="children";
var choresTable="chores";
var childParentTable="childparent";
var childChoreTable="childchore";
var hashed="";
// Creating tables to the database
export const init=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            // If you want to clear any table
            //tx.executeSql('DROP TABLE IF EXISTS parents', [])
            // Parents table
            tx.executeSql('CREATE TABLE IF NOT EXISTS '+parentTable+'(parentID INTEGER NOT NULL PRIMARY KEY, parentUsername VARCHAR(30) NOT NULL, parentPassword varchar(200) NOT NULL, parentMoney REAL);',
            // Here would be all the values
            [],
            // If the transaction succeeds, this is called
            ()=>{
                resolve();
            },
            // If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
 
            // Children table
            tx.executeSql('CREATE TABLE IF NOT EXISTS '+childTable+'(childID INTEGER NOT NULL PRIMARY KEY, childUsername VARCHAR(30) NOT NULL, childPassword varchar(200) NOT NULL, childMoney REAL);',
            // Here would be all the values
            [],
            // If the transaction succeeds, this is called
            ()=>{
                resolve();
            },
            // If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );

            // Chores table
            tx.executeSql('CREATE TABLE IF NOT EXISTS '+choresTable+'(choreID INTEGER NOT NULL PRIMARY KEY, choreInfo TEXT NOT NULL);',
            // Here would be all the values
            [],
            // If the transaction succeeds, this is called
            ()=>{
                resolve();
            },
            // If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );

            // Children's parents table or Parents' children table
            tx.executeSql('CREATE TABLE IF NOT EXISTS '+childParentTable+'(childparentID INTEGER NOT NULL PRIMARY KEY, child INTEGER NOT NULL REFERENCES children(childID), parent INTEGER NOT NULL REFERENCES parents(parentID));',
            // Here would be all the values
            [],
            // If the transaction succeeds, this is called
            ()=>{
                resolve();
            },
            // If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );

            // Children's chores table
            tx.executeSql('CREATE TABLE IF NOT EXISTS '+childChoreTable+'(childchoreID INTEGER NOT NULL PRIMARY KEY, child INTEGER NOT NULL REFERENCES children(childID), chore INTEGER NOT NULL REFERENCES chores(choreID), done BOOLEAN);',
            // Here would be all the values
            [],
            // If the transaction succeeds, this is called
            ()=>{
                resolve();
            },
            // If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );

        });
    });
    return promise;

};

export const loginCheck=(user, pass)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            // Making password more secure, not plain text
            sha256(pass).then((hash) => {
                hashed = hash;
                // Selecting only password with given name
                tx.executeSql('SELECT parentPassword FROM '+parentTable+' WHERE parentUsername = "'+user+'"', [],
                    (tx, result)=>{
                        // Making sure there is user with given name
                        var len = result.rows.length;
                        if (len > 0) {
                            // Setting row so we can check later if passwords match
                            let row = result.rows.item(0);
                            if (hashed === row.parentPassword){
                                // If password matches
                                resolve("Ok");

                            }
                            // If password doesn't match
                            resolve("No ok");
                        }
                        // If there is no account with given name
                        resolve("No ac");
                        
                    },
                    (tx,err)=>{
                        console.log("Err");
                        console.log(err);
                        reject(err);
                    }
                );
            });
        });
    });
    return promise;
};

export const addParent=(pUser, pPass, pMoney)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            // Making password more secure, not plain text
            sha256(pPass).then((hash) => {
                hashed = hash;
                // Prepared statement with placeolders
                tx.executeSql('insert into '+parentTable+' (parentUsername, parentPassword, parentMoney) values(?,?,?);',
                    // Values for the placeholders
                    [pUser, hashed, pMoney],
                    // If the transaction succeeds, this is called
                    ()=>{
                            resolve();
                    },
                    // If the transaction fails, this is called
                    (_,err)=>{
                        reject(err);
                    }
                ); 
            });
        });
    });
    return promise;
};

export const all=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('select * from '+parentTable, [],
                (tx, result)=>{
                    let items=[];//Create a new empty Javascript array
                    //And add all the items of the result (database rows/records) into that table
                    for (let i = 0; i < result.rows.length; i++){
                        items.push(result.rows.item(i));//The form of an item is {"breed": "Pike", "id": 1, "weight": 5000}
                        console.log(result.rows.item(i));//For debugging purposes to see the data in console window
                    }
                    console.log(items);//For debugging purposes to see the data in console window
                    resolve(items);//The data the Promise will have when returned
                },
                (tx,err)=>{
                    console.log("Err");
                    console.log(err);
                    reject(err);
                }
            );
        });
    });
    return promise;
};
