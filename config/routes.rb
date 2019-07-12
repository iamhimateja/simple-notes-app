Rails.application.routes.draw do
  root 'notes#index'
  devise_for :users
  devise_scope :user do
    get 'login', to: 'devise/sessions#new'
    get 'register', to: 'devise/registrations#new'
  end

  post "new/note" => "notes#new_note", constraints: {xhr?: true}
  delete "delete/note/:id" => "notes#delete_note", as: "delete_note"
end
