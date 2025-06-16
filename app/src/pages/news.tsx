import { useEffect, useState } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';
import { type NewDto, NewsService } from '@/client-api';

export function News() {
  const [news, setNews] = useState<NewDto[]>([]);

  useEffect(() => {
    NewsService.findAll().then((response) => {
      setNews(response);
    });
  }, []);

  const toggleLike = (postId: number) => {
    console.log('Like');
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      {news.map((post) => (
        <div
          key={post.id}
          className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 mr-3">
                  <img
                    src={post.author.photo}
                    alt={post.author.name}
                    className="aspect-square h-full w-full"
                  />
                </span>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-mentori-green">
                      {post.author.name}
                    </h3>
                    {post.isAdmin && (
                      <span className="ml-2 text-xs bg-mentori-green/10 text-mentori-green px-2 py-0.5 rounded-full">
                        Administrateur
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="mr-1" size={12} />
                    <span>Il y a {post.createdAt}</span>
                  </div>
                </div>
              </div>
              <button
                className="h-10 w-10 inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                type="button"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="mt-3">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {post.media && (
              <div className="mt-3">
                <img
                  src={post.media}
                  alt="News Media"
                  className="w-full rounded-md"
                />
              </div>
            )}

            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center text-xs text-gray-500">
                <span>10 j'aime</span>
                <span className="mx-2">•</span>
                <span>2 commentaires</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between">
              <button
                onClick={() => toggleLike(post.id)}
                className={`h-9 rounded-md px-3 flex items-center text-sm gap-2 ${
                  post.published
                    ? 'text-mentori-orange'
                    : 'text-gray-500 hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <ThumbsUp className="mr-1" size={18} />
                <span>J'aime</span>
              </button>

              <button className="h-9 rounded-md px-3 flex items-center text-gray-500 text-sm gap-2 hover:bg-accent hover:text-accent-foreground">
                <MessageCircle className="mr-1" size={18} />
                <span>Commenter</span>
              </button>

              <button className="h-9 rounded-md px-3 flex items-center text-gray-500 text-sm gap-2 hover:bg-accent hover:text-accent-foreground">
                <Share2 className="mr-1" size={18} />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
