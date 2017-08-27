require	"sinatra"
require "pry"
require "sinatra/reloader"

get '/' do 
	

	erb :index
end

get "/posts" do
	
    erb :info
end