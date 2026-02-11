import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Project = {
  id: string;
  title: string;
  slug: string;
  year: number;
  subtitle?: string | null;
  coverSrc: string;
  published: boolean;
};

type Photo = {
  id: string;
  src: string;
  thumbSrc: string;
  order: number;
  title?: string | null;
  caption?: string | null;
};

const TOKEN_KEY = "adminToken";

export default function Admin() {
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(TOKEN_KEY);
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
  }, [token]);

  const authHeader: HeadersInit = useMemo(() => {
    if (token) return { Authorization: `Bearer ${token}` } as HeadersInit;
    return {} as HeadersInit;
  }, [token]);

  async function loadProjects() {
    setLoadingProjects(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/projects", {
        headers: { ...authHeader },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setProjects(data.items || []);
    } catch (e: any) {
      setStatus(`加载失败: ${e.message}`);
    } finally {
      setLoadingProjects(false);
    }
  }

  async function createProject(form: HTMLFormElement) {
    form.preventDefault();
  }

  async function handleCreate(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const title = fd.get("title")?.toString().trim();
    const year = Number(fd.get("year"));
    const coverSrc = fd.get("cover")?.toString().trim();
    const subtitle = fd.get("subtitle")?.toString().trim();
    if (!title || !year || !coverSrc) {
      setStatus("请填写标题/年份/封面 URL");
      return;
    }
    setCreating(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify({
          title,
          year,
          subtitle,
          cover: { src: coverSrc },
          published: false,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      ev.currentTarget.reset();
      await loadProjects();
      setStatus("创建成功");
    } catch (e: any) {
      setStatus(`创建失败: ${e.message}`);
    } finally {
      setCreating(false);
    }
  }

  async function selectProject(id: string) {
    setSelectedId(id);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/projects/${id}/photos`, {
        headers: { ...authHeader },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setPhotos(data.items || []);
    } catch (e: any) {
      setStatus(`加载照片失败: ${e.message}`);
      setPhotos([]);
    }
  }

  async function handleUpload(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!selectedId) return;
    const fd = new FormData(ev.currentTarget);
    const file = fd.get("file");
    if (!(file instanceof File)) {
      setStatus("请选择文件");
      return;
    }
    setUploading(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/projects/${selectedId}/photos`, {
        method: "POST",
        headers: { ...authHeader },
        body: fd,
      });
      if (!res.ok) throw new Error(await res.text());
      await selectProject(selectedId);
      ev.currentTarget.reset();
      setStatus("上传成功");
    } catch (e: any) {
      setStatus(`上传失败: ${e.message}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grain min-h-screen">
      <SiteHeader />
      <main className="container-padded py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <section className="rounded-3xl border border-ink/10 bg-white/85 p-8 shadow-lg backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-2xl font-semibold font-display">后台（MVP）</h1>
              <button
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                onClick={loadProjects}
                disabled={loadingProjects}
              >
                {loadingProjects ? "加载中..." : "刷新项目"}
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-xs font-medium text-ink/60">
                Admin Token（仅保存在本地浏览器）
              </label>
              <input
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="粘贴 ADMIN_TOKEN"
              />
            </div>

            <form className="mt-6 space-y-3" onSubmit={handleCreate}>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                创建项目
              </p>
              <input
                name="title"
                placeholder="标题"
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
              />
              <input
                name="subtitle"
                placeholder="副标题（可选）"
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
              />
              <input
                name="year"
                type="number"
                placeholder="年份，例如 2025"
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
              />
              <input
                name="cover"
                placeholder="封面图 URL（display 级别）"
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className={cn(buttonVariants({ size: "sm" }))}
                disabled={creating}
              >
                {creating ? "创建中..." : "创建项目"}
              </button>
            </form>

            {status && (
              <p className="mt-4 text-sm text-amber-800">{status}</p>
            )}
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-ink/10 bg-white/80 p-8 backdrop-blur">
              <h2 className="text-lg font-semibold mb-3">项目列表</h2>
              <div className="space-y-3">
                {projects.length === 0 && (
                  <p className="text-sm text-ink/60">尚无项目，先创建一个。</p>
                )}
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => selectProject(p.id)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left transition",
                      p.id === selectedId
                        ? "border-ink/40 bg-ink/5"
                        : "border-ink/10 hover:border-ink/30"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-ink/60">
                          {p.year} · {p.slug}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-xs rounded-full px-3 py-1",
                          p.published
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        )}
                      >
                        {p.published ? "已发布" : "草稿"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-white/80 p-8 backdrop-blur">
              <h2 className="text-lg font-semibold mb-3">照片上传</h2>
              {!selectedId && (
                <p className="text-sm text-ink/60">请选择项目后再上传。</p>
              )}
              {selectedId && (
                <>
                  <form className="space-y-3" onSubmit={handleUpload}>
                    <input type="file" name="file" className="block text-sm" />
                    <input
                      name="title"
                      placeholder="标题（可选）"
                      className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
                    />
                    <input
                      name="caption"
                      placeholder="说明文字（可选）"
                      className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
                    />
                    <div className="flex gap-3">
                      <input
                        name="location"
                        placeholder="地点（可选）"
                        className="flex-1 rounded-lg border border-ink/15 px-3 py-2 text-sm"
                      />
                      <input
                        name="takenAt"
                        placeholder="拍摄日期 YYYY-MM-DD（可选）"
                        className="flex-1 rounded-lg border border-ink/15 px-3 py-2 text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className={cn(buttonVariants({ size: "sm" }))}
                      disabled={uploading}
                    >
                      {uploading ? "上传中..." : "上传"}
                    </button>
                  </form>

                  <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {photos.map((photo) => (
                      <figure
                        key={photo.id}
                        className="overflow-hidden rounded-lg border border-ink/10 bg-white"
                      >
                        <img
                          src={photo.thumbSrc || photo.src}
                          alt={photo.title || ""}
                          className="aspect-square w-full object-cover"
                        />
                        <figcaption className="px-3 py-2 text-xs text-ink/70">
                          #{photo.order} {photo.title || "无标题"}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
