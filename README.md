# 📝 User-Based Notes API (Not Uygulaması Backend)

NestJS ile geliştirilmiş, kullanıcı tabanlı, güvenli ve ölçeklenebilir bir Not Alma REST API projesi.

Bu proje, mobil ve web uygulamaları için güçlü bir arka uç (backend) sağlar.

## 🚀 Özellikler

### 🔐 Güvenlik ve Kimlik Doğrulama

- **JWT (JSON Web Token)**: Güvenli giriş ve kayıt işlemleri.
- **Şifreleme**: Kullanıcı şifreleri veritabanında "bcrypt" ile şifreli saklanır.
- **Korumalı Endpointler**: Tüm sistem varsayılan olarak kilitlidir (`JwtAuthGuard`). Sadece geçerli token'a sahip kullanıcılar işlem yapabilir.
- **Kullanıcıya Özel Veri**: Her kullanıcı sadece **kendi** notlarını, kategorilerini ve etiketlerini görebilir/düzenleyebilir.

### 🏗️ Modüller

1.  **Auth Modülü**: Giriş, kayıt ve token işlemleri.
2.  **Users Modülü**: Kullanıcı yönetimi.
3.  **Notes Modülü**: Not oluşturma, okuma, güncelleme, silme (CRUD).
4.  **Categories Modülü**: Kategorilendirme sistemi (Örn: İş, Kişisel).
5.  **Tags Modülü**: Etiketleme sistemi (Örn: #acil, #fikir).

### 🛠️ Teknolojiler

- **Framework**: NestJS (TypeScript)
- **Veritabanı**: MySQL 5.7 (Docker üzerinde çalışır)
- **ORM**: TypeORM (Veritabanı yönetimi için)
- **Dokümantasyon**: Swagger (Otomatik API testi ve dokümanı)

---

## 🏃‍♂️ Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin.

### 1. Gereksinimler

- Node.js (v16 veya üzeri)
- Docker Desktop (Veritabanı için)

### 2. İndirme ve Paketleri Yükleme

Projeyi klonlayın ve gerekli kütüphaneleri indirin:

```bash
# Projeyi indirin
git clone https://github.com/ahmetakaslan1/user-based-note.git

# Klasöre girin
cd user-based-note

# Paketleri yükleyin
npm install
```

### 3. Veritabanını Başlatma

Veritabanını Docker ile tek komutta ayağa kaldırın:

```bash
docker-compose up -d
```

> _Not: Bu komut arka planda bir MySQL sunucusu çalıştırır._

### 4. Uygulamayı Başlatma

Geliştirme modunda (değişiklikleri anlık görerek) başlatmak için:

```bash
npm run start:dev
```

Terminalde **"Nest application successfully started"** yazısını gördüyseniz işlem tamamdır! 🎉

---

## 📖 Kullanım Kılavuzu (API Dokümantasyonu)

Uygulama çalışırken tarayıcınızdan şu adrese gidin:

👉 **[http://localhost:3000/doc](http://localhost:3000/doc)**

Burada **Swagger** arayüzünü göreceksiniz. Bu arayüz üzerinden:

1.  `/auth/register` ile yeni bir kullanıcı oluşturun.
2.  `/auth/login` ile giriş yapın ve **AccessToken** (Token) alın.
3.  Sayfanın üstündeki **Authorize** butonuna tıklayın ve token'ı yapıştırın: `Bearer <token_yapıştırın>`
4.  Artık kilitli olan `/notes`, `/categories`, `/tags` gibi tüm servisleri test edebilirsiniz.

---

## 📂 Proje Yapısı

```bash
src/
├── app.module.ts          # Ana modül dosyası
├── main.ts                # Uygulamanın giriş noktası (Port, CORS, Swagger ayarları)
├── modules/               # Uygulama modülleri
│   ├── auth/              # Giriş/Güvenlik işlemleri
│   ├── categories/        # Kategori yönetimi
│   ├── notes/             # Not yönetimi
│   ├── tags/              # Etiket yönetimi
│   └── users/             # Kullanıcı veritabanı işlemleri
└── base/                  # Ortak kullanılan temel sınıflar (BaseEntity vb.)
```

## 🌍 Frontend ve Mobil Entegrasyonu

Bu API, `http://localhost:3000/api` adresi üzerinden hizmet verir.

- **CORS** açıktır, React/Next.js/Flutter uygulamaları sorunsuz bağlanabilir.
- Tüm endpointler `/api` ile başlar (Örn: `/api/notes`).

---

👨‍💻 **Geliştirici**: Ahmet Akaslan
