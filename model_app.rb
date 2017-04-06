require './tools'
require './params'

def sql_query(query)

  params = {
    host: Params::PG_HOST,
    port: Params::PG_PORT,
    dbname: Params::PG_DB_NAME,
    user: Params::PG_USER,
    password: Params::PG_PASSWORD
  }

  result = Tools::postgres(params.merge(query))
  puts result[:status] if result[:status]

  result[:result]

end

def authentication!

  if !session[:authenticated] || session[:authenticated] == nil
    halt 401, {authenticated: false}.to_json
  end

end

def authorization!

  if session[:username] == 'test' || session[:username] == 'testl'
    halt 470
  end
end



def login(params)

  username = params[:username].to_s
  password = params[:password].to_s

  email_regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/

  if email_regex.match(username)
      #todo tutaj sprawdzic maila
      sql = {statement: 'SELECT user_name FROM users WHERE user_name = $1', values: [username.to_s.downcase]}
      result = sql_query(sql)

      if result.count == 1
        username = result[0]['user_name']
      end

  else

    sql = {statement: 'SELECT user_name FROM users WHERE user_name = $1', values: [username.to_s.downcase]}
      result = sql_query(sql)

      if result.count == 1
        username = result[0]['user_name']
      end

  end

  if result.count == 1 

      sql = {statement: 'SELECT id, name, ramy_permission, admin_permission FROM users WHERE user_name = $1 AND password = $2', values: [username, password]} #tutaj zrobic hasha, nie czysty kod
      login_result = sql_query(sql)

      if login_result.count == 1

          res = login_result[0]

          username  = login_result[0]['name']

            session[:authenticated] = true
            session[:username] = res['name']
            session[:account_id] = res['id']
            session[:ramy_permission] = res['ramy_permission'] 
            session[:admin_permission] = res['admin_permission']

            response = { authenticated: true, account_id: session[:account_id], username: session[:username], permission: session[:admin_permission] }


      else

          response = {authenticated: false}

      end

  else

      response = {authenticated: false}

  end

  response

end

def change_password(params) 

  authentication!

  passwd = params[:password]

  sql = {statement: 'UPDATE users set password = $1 where id = $2', values: [passwd, session[:account_id]]} #tutaj zrobic hasha, nie czysty kod

  login_result = sql_query(sql)

end

def change_email(params) 

  authentication!

  email = params[:email]

  sql = {statement: 'UPDATE users set email = $1 where id = $2', values: [email, session[:account_id]]} #tutaj zrobic hasha, nie czysty kod
  login_result = sql_query(sql)

end

def add_new_module(params)

  authentication!

  name = params[:name]
  color = params[:color]

  sql = {statement: 'INSERT INTO lista_modulow (nazwa, kolory_modulow_id) values($1, $2)', values: [name, color] }
  sql_query(sql)

end

def get_modules()

  authentication!

  modules = []

  sql = {statement: 'SELECT * FROM lista_modulow'}
  result = sql_query(sql)

  result.each do |s|
    modules << s
  end

  modules

end


def get_years() 

  authentication!

  years = []

  sql = {statement: 'SELECT * FROM lista_rocznikow'}
  result = sql_query(sql)

  result.each do |s|
    years << s
  end

  years

end


def add_new_year(params)

  authentication!

  name = params[:name]

  sql = {statement: 'INSERT INTO lista_rocznikow (nazwa) values($1)', values: [name] }
  sql_query(sql)

  status = 1

  status

end

def send_modules(params)

authentication!

year = params[:year]
color = params[:color]
semester = params[:semester]
modules = params[:module]

sql = {statement: 'INSERT INTO lista_wybranych_modulow (lista_rocznikow_id, lista_semestrow_id, kolory_modulow_id, lista_modulow_id) values($1, $2, $3, $4)', values: [year, semester, color, modules] }
sql_query(sql)


end


def get_picked_modules_list()

  authentication!

  sql = {statement: 'SELECT * FROM lista_wybranych_modulow LEFT JOIN lista_modulow on lista_modulow.id = lista_wybranych_modulow.lista_modulow_id', values: [] }
  result = sql_query(sql)
  res = []
  result.each do |s|
    res << s
  end

  res

end

def get_picked_modules_list2()

  authentication!

  sql = {statement: '  SELECT w.id, lista_semestrow.nazwa as semestr, w.count_lecture, w.count_exercise, w.count_consultation, w.user_id, users.surname, lista_rocznikow.nazwa as rocznik, lista_modulow.nazwa as modul FROM lista_wybranych_modulow w  
  LEFT JOIN lista_semestrow on w.lista_semestrow_id = lista_semestrow.id
  LEFT JOIN lista_rocznikow on w.lista_rocznikow_id = lista_rocznikow.id
  LEFT JOIN lista_modulow on w.lista_modulow_id = lista_modulow.id
  LEFT JOIN users on w.user_id = users.id
order by w.id
', values: [] }
  result = sql_query(sql)
  res = []
  result.each do |s|
    res << s
  end

  res

end


def get_all_users() 

authentication!

sql = {statement: 'SELECT id, name, surname FROM users', values: [] }
  
  result = sql_query(sql)
  res = []
  result.each do |s|
    res << s
  end

  res

end


def save_user(params)
 
 authentication!
 
  user_id = params[:user_id]
  module_id = params[:module_id]

  sql = {statement: 'UPDATE lista_wybranych_modulow set user_id = $1 where id = $2', values: [user_id, module_id] }
  sql_query(sql)

end


def add_new_user(params)
 
 authentication!

  user_name = params[:user_name]
  name = params[:name]
  surname = params[:surname]
  email = params[:email]
  permission = params[:permission]

  sql = {statement: 'INSERT INTO users (user_name, password, name, surname, email, admin_permission) values($1, $2, $3, $4, $5, $6)', values: [user_name, user_name, name, surname, email, permission] }
  sql_query(sql)

end

def get_all_my_programs()

 authentication!

  sql = {statement: 'SELECT * FROM lista_wybranych_modulow where user_id = $1', values: [session[:account_id]] }
  
  result = sql_query(sql)
  res = []
  result.each do |s|
    res << s
  end

  res

end

def get_all_my_programs2()

 authentication!

  sql = {statement: '  SELECT w.id, lista_semestrow.nazwa as semestr, w.count_lecture, w.count_exercise, w.count_consultation, lista_rocznikow.nazwa as rocznik, lista_modulow.nazwa as modul FROM lista_wybranych_modulow w  
  LEFT JOIN lista_semestrow on w.lista_semestrow_id = lista_semestrow.id
  LEFT JOIN lista_rocznikow on w.lista_rocznikow_id = lista_rocznikow.id
  LEFT JOIN lista_modulow on w.lista_modulow_id = lista_modulow.id
where w.user_id = $1 ', values: [session[:account_id]] }
  
  result = sql_query(sql)
  res = []
  result.each do |s|
    res << s
  end

  res

end


def send_program_hours(params)
 
 authentication!
 
  module_id = params[:module_id].to_i
  count_lecture = params[:count_lecture].to_i
  count_exercise = params[:count_exercise].to_i
  count_consultation = params[:count_consultation].to_i

  sql = {statement: 'UPDATE lista_wybranych_modulow set count_lecture = $1, count_exercise = $2, count_consultation = $3 where id = $4', values: [count_lecture, count_exercise, count_consultation, module_id] }
  sql_query(sql)

end

def all_accounts()

 authentication!

  sql = {statement: 'SELECT * FROM users', values: [] }
  
  result = sql_query(sql)
  res = []
  result.each do |s|
    res << s
  end

  res

end


def change_password_user(params)

   authentication!

  id = params[:id].to_i
  password = params[:password]

  sql = {statement: 'UPDATE users set password=$1 where id = $2', values: [password, id] }
  sql_query(sql)


end

def delete_account(params)

   authentication!

  id = params[:id].to_i

  sql = {statement: 'DELETE from users where id = $1', values: [id] }
  sql_query(sql)


end