require 'sinatra/base'
require 'json/ext'
require 'encrypted_cookie'
require './params'
require './tools'
require './model_app'

class App < Sinatra::Base


  configure :development do

    set server: 'puma'
    set bind: '0.0.0.0'
    set port: 88

    use Rack::Session::EncryptedCookie,
        key: 'session',
        httponly: true,
        secure: false,
        secret: 'djlasllasjd98as7d9as87da9s87d9a8s7da9s8d7as98d7a9s8d7a7dasd65asd58'

  end

  configure :production do

    use Rack::Session::EncryptedCookie,
        key: 'session',
        httponly: true,
        secure: true,
        secret: 'djlasllasjd98as7d9as87da9s87d9a8s7da9s8d7as98d7a9s8d7a7dasd65asd58'

  end



  get '/' do

      if session[:authenticated]
        redirect '/authenticated'
      else
        redirect '/login'
      end

  end


  get '/login' do

    if session[:authenticated]
      redirect '/authenticated'
    else
      erb :main
    end

  end


  get '/authenticated' do

    erb :main

  end


  get '/views/public/:view' do

      case params[:view]

        when 'login' then erb :login, layout: false
        when 'login_header' then erb :login_header, layout: false
        when 'footer' then erb :footer, layout: false
        # when 'forgot_password' then erb :forgot_password, layout: false
        # when 'reset_password' then erb :reset_password, layout: false

        else erb :error_404, layout: false

      end

  end

  
  get '/views/protected/:view' do

    authentication!

    case params[:view]

      when 'home' then erb :home, layout: false
      when 'top_menu' then erb :top_menu, layout: false
      when 'main_view' then erb :main_view, layout: false
      when 'frames' then erb :frames, layout: false
      when 'correction' then erb :correction, layout: false
      when 'settings' then erb :settings, layout: false
      when 'my_programs' then erb :my_programs, layout: false
      when 'add_new_modules' then erb :add_new_modules, layout: false  
      when 'add_new_user' then erb :add_new_user, layout: false
      when 'manage_accounts' then erb :manage_accounts, layout: false

      
      else erb :error_404, layout: false

    end

  end


  post '/is_authenticated' do

    content_type :json

    if session[:authenticated]

      {authenticated: true, permission: session[:admin_permission]}.to_json

    else

      {authenticated: false, permission: 0}.to_json

    end

  end


  post '/login' do

    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    login(params).to_json
  end

  post '/change_password' do 

    authentication!
    
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)

    change_password(params).to_json
  
  end


  post '/change_email' do 
    
    authentication!
    
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    
    change_email(params).to_json
  
  end


  post '/add_new_module' do
    
    authentication!
    
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
  
    add_new_module(params).to_json

  end


  post '/get_modules' do

    authentication!

    get_modules().to_json
  
  end


  post '/get_years' do 
  
    authentication!
  
    get_years().to_json

  end

  post '/get_picked_modules_list' do

    authentication!

    get_picked_modules_list().to_json
  end
    post '/get_picked_modules_list2' do

    authentication!

    get_picked_modules_list2().to_json
  end


  post '/add_new_year' do

    authentication!  

    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    
    add_new_year(params).to_json

  end

  post '/send_modules' do
  
  authentication!
  
  content_type :json
  params = JSON.parse(request.body.read, symbolize_names: true)

  send_modules(params).to_json

  end


  post '/get_all_users' do
 
    authentication!
    
    get_all_users().to_json

  end


  post '/save_user' do
    
    authentication!
    
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)

    save_user(params).to_json

  end

  post '/add_new_user' do 
    
    authentication!
    
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)

    add_new_user(params).to_json

  end


  post '/get_all_my_programs' do 
    
    authentication!
    
    get_all_my_programs().to_json

  end
    post '/get_all_my_programs2' do 
    
    authentication!
    
    get_all_my_programs2().to_json

  end

  post '/send_program_hours' do
    
    authentication!
    
    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    
    send_program_hours(params).to_json

  end

  post '/all_accounts' do
  
    authentication!
    
    all_accounts().to_json

  end

  post '/change_password_user' do

    authentication!

    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    
    change_password_user(params).to_json

  end


  post '/delete_account' do

    authentication!

    content_type :json
    params = JSON.parse(request.body.read, symbolize_names: true)
    
    delete_account(params).to_json

  end


  post '/logout' do

    content_type :json

    session.clear
    redirect '/'
  end


  get '/*' do

    # przypadek gdy po stronie routingu angulara obsłużonych jest więcej adresów url niż po stronie sinatry
    # po odświeżeniu strony przez F5 zapytanie z adresem url nieobsłużonym po stronie sinatry trafia tutaj
    # po czym zwracana jest cała strona a routingiem znowu zajmuje się angularowy $stateProvider

    puts '/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/'

    erb :main

  end

end
