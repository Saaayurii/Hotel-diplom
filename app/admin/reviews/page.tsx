'use client';

import React, { useEffect, useState } from 'react';
import { Star, Check, X } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  isApproved: boolean;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
  hotel: {
    name: string;
  };
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await fetch(`/api/admin/reviews/${id}/approve`, { method: 'POST' });
      fetchReviews();
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-black mb-2">Reviews Management</h1>
        <p className="text-gray-600">Moderate and manage hotel reviews</p>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
            No reviews found.
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {review.user.firstName} {review.user.lastName}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating
                              ? 'fill-[#C9A56B] text-[#C9A56B]'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        review.isApproved
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {review.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {review.hotel.name} • {formatDate(review.createdAt)}
                  </p>
                  {review.title && (
                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                  )}
                  {review.comment && (
                    <p className="text-gray-700">{review.comment}</p>
                  )}
                </div>
                {!review.isApproved && (
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => handleReject(review.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
