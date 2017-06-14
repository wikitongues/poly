require "rails_helper"

describe "Signing up as a user" do

  it "allows users to sign up" do
    visit "/sign_up"
    expect(page).to have_content("Sign up")

    fill_in "user[username]", with: "name"
    fill_in "user[email]", with: "test@email.com"
    fill_in "user[password]", with: "password"
    fill_in "user[password_confirmation]", with: "password"
    within find(".new_user") do
      click_on "Sign up"
   end

    expect(page).to have_content("Welcome! You have signed up")
  end
end
