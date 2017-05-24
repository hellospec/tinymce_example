class ImagesController < ApplicationController
  def create
    img = Image.new(image_params)
    img.save!

    render json: { location: img.image.url }
  end

  private
  def image_params
    params.require(:image).permit(:image)
  end
end
