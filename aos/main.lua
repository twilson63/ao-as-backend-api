-- TODOS
local sqlite3 = require('lsqlite3')
Configured = Configured or false 

function Configure() 
  Db = sqlite3.open_memory()
  dbAdmin = require('@rakis/DbAdmin').new(Db)
  
  dbAdmin:exec([[
CREATE TABLE IF NOT EXISTS Todos (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Owner TEXT NOT NULL,
  Description TEXT NOT NULL,
  Complete INTEGER NOT NULL
);
  ]])

  Configured = true
end

if not Configured then 
  Configure()
end

Handlers.add("List", function (msg) 
  local todos = dbAdmin:select('select Id, Description, Complete from Todos where Owner = ?', {msg.From})
  print(require('json').encode(todos))
end)

Handlers.add("Add-Item", function (msg)
  dbAdmin:apply('insert into Todos (Owner, Description, Complete) values (?, ?, ?)', 
    { msg.From, msg.Data, 0 })  
  print("OK")
end)

Handlers.add("Complete", function (msg)
  dbAdmin:apply('update Todos set Complete = 1 where Id = ? and Owner = ?', { msg.Data, msg.From }) 
  print("OK")
end)

Handlers.add("Remove", function (msg) 
  dbAdmin:apply('delete from Todos where Id = ? and Owner = ?', { msg.Data, msg.From })
  print("OK")
end)
