import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TermsOfUsePage = () => {
  const [pageContent, setPageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams(); // Get slug from URL parameter

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch content from backend API using the slug
        const response = await fetch(`https://5000-iii9xt81ei0lfy1lok6zz-9f8c80f8.manusvm.computer/api/pages/${slug}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch page content for slug: ${slug}`);
        }
        const data = await response.json();
        if (data.success) {
          setPageContent(data.data.content);
        } else {
          throw new Error(data.message || 'Failed to load page content');
        }
      } catch (err) {
        console.error('Error fetching page content:', err);
        setError(err.message);
        // Fallback to a default message if API fails or content is not found
        setPageContent(`Konten untuk halaman '${slug}' tidak dapat dimuat. Silakan coba lagi nanti atau hubungi dukungan.`);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [slug]); // Re-run effect if slug changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat konten...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg mt-8 mb-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{slug.replace(/-/g, ' ').toUpperCase()}</h1>
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: pageContent }} />
    </div>
  );
};

export default TermsOfUsePage;


