class Api::MessagesController < ApplicationController
  def index
    @groups = Group.find(params[:group_id])
    @messages = @groups.messages.where('id > ?',params[:id])
    respond_to do |format|
      format.html
      format.json
    end
  end
end