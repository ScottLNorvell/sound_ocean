source 'https://rubygems.org'

ruby '1.9.3'
gem 'rails', '3.2.13'

gem 'pg'
gem 'soundcloud'

gem "faker", "~> 1.2.0"

gem 'devise'

gem 'omniauth-soundcloud', '~> 1.0.0'

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'



group :test, :development do
  gem "rspec-rails", "~> 2.4"
  gem "spork", "~> 0.9.2"
  gem 'guard-rspec', require: false
  gem 'guard-spork'
end

group :test do
	gem "capybara", "~> 2.1.0"
	gem "factory_girl_rails", "~> 4.0"
end
