# Wgrywanie plików

Wymagania:

- Backend i frontend mają być od siebie zupełnie niezależnie, tak aby mogły
  działać na osobnych serwerach. Komunikacja pomiędzy frontend i backend ma
  odbywać się za pośrednictwem REST API.
- Aplikacja ma wyświetlać listę przesłanych plików, zawierającą podgląd
  (miniaturę), rozszerzenie, rozmiar i rozdzielczość pliku oraz imię osoby,
  która przesłała plik.
- Lista plików ma doładowywać kolejne porcje danych (np. 10 plików per request)
  na zasadzie infinite scroll.
- Z poziomu listy ma być możliwość pobrania i usunięcia pliku.
- Przesyłane pliki powinny spełniać następujące wymagania:
  - Dozwolone typy plików: JPG, PNG, WebP, TIFF, BMP
  - Maksymalny rozmiar pliku: 5 MB
  - Minimalna rozdzielczość pliku: 500 x 500 px
  - Podczas przesyłania plików konieczne ma być podanie imienia i adresu e-mail
    osoby przesyłającej; dane te mają być zapisane w bazie danych.
  - Z każdego przesłanego pliku należy wyciągnąć dane ze znaczników EXIF / IPTC
    i zapisać je w bazie danych (nie trzeba ich w jakikolwiek sposób przetwarzać
    ani wyciągać żadnych konkretnych danych).
  - Dla każdego przesłanego pliku należy pobrać z API serwisu Open-Meteo
    (https://open-meteo.com/en/docs/historical-weather-api) aktualną temperaturę
    powietrza w Katowicach i zapisać ją w bazie danych (dla ułatwienia gotowy URL,
    wystarczy pobrać dane metodą GET:
    https://api.open-meteo.com/v1/forecast?latitude=50.25841&longitude=19.02754&hourly=temperature_2m&timezone=Europe%2FWarsaw&forecast_days=1).
  - Frontend nie musi być piękny, wystarczy że nie będzie wyglądał jakby się rozsypał.

Wymagania techniczne:

- Backend: Laravel 7 lub nowszy, baza danych MySQL lub MariaDB.
- Frontend: React 16.8 lub nowszy.
- Można korzystać z dowolnych bibliotek udostępnianych na licencji MIT
  (lub kompatybilnej) i dostępnych w NPM (JavaScript) lub Packagist (PHP).
- Uwierzytelnianie i autoryzacja API nie są wymagane.
