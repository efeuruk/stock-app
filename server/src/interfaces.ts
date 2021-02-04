export interface productDoc {
  birim: string;
  kategori: string;
  olmasiGereken: number;
  stokMiktari: number;
  tedarikSuresi: string;
}
export interface product extends productDoc {
  isim: string;
}
