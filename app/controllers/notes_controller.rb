class NotesController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  def index
    @notes = Note.all
  end

  def new_note
    values = new_note_safe_params
    unless values.blank?
      note = current_user.notes.create(values)
      if note.persisted?
        message = "Note Created successfully."
        status = :created
      else
        message = note.errors.full_messages.to_sentence
        status = :unprocessible_entity
      end
    end
    respond_to do |format|
      format.json { render json: message.to_json, status: status }
    end
  end

  def delete_note
    unless params[:id].blank?
      note = current_user.notes.find(params[:id])
      unless note.blank?
        record = note.destroy
        if record.destroyed?
          flash[:info] = "Note deleted"
        end
        redirect_to root_path
      end
    end
  end

  private

  def new_note_safe_params
    params.require(:note).permit(:title, :body, :tag_list)
  end
end
