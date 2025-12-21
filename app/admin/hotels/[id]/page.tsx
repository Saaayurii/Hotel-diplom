'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/Button';
import { ArrowLeft, Save, Trash2, Upload, Star, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface HotelImage {
  id: string;
  url: string;
  caption: string | null;
  isPrimary: boolean;
  displayOrder: number;
}

export default function EditHotelPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<HotelImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchImages();
    }
  }, [params.id]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/admin/hotels/${params.id}/images`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = async () => {
    if (!newImageUrl.trim()) {
      alert('Please enter an image URL');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/hotels/${params.id}/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: newImageUrl,
          caption: newImageCaption || null,
          isPrimary: images.length === 0, // First image is primary by default
          displayOrder: images.length,
        }),
      });

      if (response.ok) {
        setNewImageUrl('');
        setNewImageCaption('');
        await fetchImages();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Failed to add image');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(
        `/api/admin/hotels/${params.id}/images?imageId=${imageId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        await fetchImages();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleSetPrimary = async (imageId: string) => {
    try {
      const response = await fetch(
        `/api/admin/hotels/${params.id}/images?imageId=${imageId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isPrimary: true,
          }),
        }
      );

      if (response.ok) {
        await fetchImages();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image');
    }
  };

  const handleUpdateCaption = async (imageId: string, caption: string) => {
    try {
      const response = await fetch(
        `/api/admin/hotels/${params.id}/images?imageId=${imageId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            caption,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error updating caption:', error);
      alert('Failed to update caption');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A56B]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-serif text-black mb-2">Hotel Images</h1>
            <p className="text-gray-600">Manage images for this hotel</p>
          </div>
        </div>
      </div>

      {/* Add New Image Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload size={20} />
          Add New Image
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="/hotel-image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter a URL starting with / for images in the public folder (e.g., /1.jpg, /2.jpg)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption (Optional)
            </label>
            <input
              type="text"
              value={newImageCaption}
              onChange={(e) => setNewImageCaption(e.target.value)}
              placeholder="Hotel lobby"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent"
            />
          </div>
          <Button
            variant="primary"
            onClick={handleAddImage}
            disabled={saving || !newImageUrl.trim()}
          >
            <Upload size={18} className="mr-2" />
            {saving ? 'Adding...' : 'Add Image'}
          </Button>
        </div>
      </div>

      {/* Images Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ImageIcon size={20} />
          Hotel Images ({images.length})
        </h2>
        {images.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No images yet. Add your first image above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={image.url}
                    alt={image.caption || 'Hotel image'}
                    fill
                    className="object-cover"
                  />
                  {image.isPrimary && (
                    <div className="absolute top-2 left-2 px-3 py-1 bg-[#C9A56B] text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Star size={12} className="fill-white" />
                      Primary
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <input
                    type="text"
                    value={image.caption || ''}
                    onChange={(e) => {
                      const newImages = images.map((img) =>
                        img.id === image.id ? { ...img, caption: e.target.value } : img
                      );
                      setImages(newImages);
                    }}
                    onBlur={(e) => handleUpdateCaption(image.id, e.target.value)}
                    placeholder="Add caption..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent mb-3"
                  />
                  <div className="flex items-center gap-2">
                    {!image.isPrimary && (
                      <button
                        onClick={() => handleSetPrimary(image.id)}
                        className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-[#C9A56B] hover:text-white text-gray-700 rounded-lg transition-colors"
                      >
                        Set as Primary
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="px-3 py-2 text-sm bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
