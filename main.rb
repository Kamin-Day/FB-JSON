require	"sinatra"
require "pry"

get '/' do 
	

	erb :index
end

get "/posts" do
	
    erb :info
end