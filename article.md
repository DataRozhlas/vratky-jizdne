title: "Kolik a komu platí ministerstvo dopravy za levnější jízdné pro studenty a důchodce"
perex: "Tři a čtvrt miliardy korun zaplatilo ministerstvo dopravy od září do dubna za zlevněné jízdenky, zejména pro studenty a důchodce. Kompenzace slev z jízdného v osobní dopravě mu za tu dobu naúčtovalo 149 dopravních firem. A oproti stejnému období předchozího roku stouply náklady na slevy více než dvacetinásobně. Server iROZHLAS.cz přináší aplikaci, která porovnává výši kompenzací v čase i mezi jednotlivými dopravci."
styles: []
libraries: [] #jquery, d3, highcharts, datatables
options: [noheader, nopic] #wide, noheader (, nopic)
---

Aplikace čerpá data z přehledu [proplacených faktur](https://www.mdcr.cz/Ministerstvo/Otevrena-data/Faktury), jež ministerstvo zveřejňuje na webu. Zatím poslední dostupné jsou údaje za duben. Vzhledem k zavedeným účetním postupům se mohou průběžné součty mírně odlišovat od čísel, která zveřejňuje samotný úřad. Čím delší je však časová řada a čím dále sahá do minulosti, tím jsou data přesnější. Podrobnější vysvětlení [najdete níže](#vysvetleni).

V grafu si můžete zvolit období, které vás zajímá a součty se automaticky aktualizují. Dopravci v tabulce pod grafem jsou seřazení sestupně podle objemu proplacených slev ve vybraném období. Kliknutím na počet vystavených faktur u každého dopravce zobrazíte zdrojová data.

<wide>
<label for="vybiratko">Vyberte dopravce:</label>
<select id="vybiratko">
</select>
<div id="graf" style="height: 400px"></div>
<div id="popisek">
  <h3 id="veta1"></h3>
  <p id="veta2"></p>
</div>
<table id="dodavatele">
  <tbody></tbody>
</table>
</wide>
<div class="modal-azr" id="vypisFaktur">
  <div class="modal-azr-content">
    <span class="close-modal">&times;</span>
    <h3 id="faktury-header"></h3>
    <table id="faktury">
      <thead><tr>
        <th scope="col">číslo</th>
        <th scope="col">datum</th>
        <th scope="col">účel platby</th>
        <th scope="col" style="text-align:right;">částka</th>
      </tr></thead>
      <tbody></tbody>
    </table>
  </div>
</div>

V grafu je vidět prudký nárůst proplacených slev loni v říjnu, poté co začaly platit plošné pětasedmdesátiprocentní slevy pro žáky a studenty do 26 let a pro seniory starší 65 let. Do té doby ministerstvo na kompenzacích vyplácelo řádově nižší sumy, například za bezplatné cestování předškolních dětí nebo za levnější žákovské a studentské jízdné při dojíždění do školy.

Prudký propad v lednu způsobila podle ministerstva potřeba předělat smlouvy se všemi dopravci – ti potom fakturovali zlevněné jízdenky s delším časovým odstupem. Výkyv by se neměl opakovat, aktuální smlouvy jsou uzavřené na dobu neurčitou.  

<a name="vysvetleni"></a>

## Proč ministerstvo publikuje odlišná čísla

„V otevřených datech jsou zveřejněny uhrazené faktury za ukončený kalendářní měsíc – data jsou publikována po skončení měsíce. Naproti tomu statistické údaje prezentované ministerstvem dopravy jsou založeny na doručených fakturách bez ohledu na to, zda již byly uhrazeny,“ vysvětlil serveru iROZHLAS.cz mluvčí resortu František Jemelka. „Čili například v záznamech, které teď můžete za duben 2019 v otevřených datech posbírat, jsou pouze faktury „nejrychlejších“ dopravců doručené MD v prvních květnových dnech, proplacené ještě v květnu.“

<!--[[ZPRAVY_ARTICLE:7973816:1:1]]-->

Ani ministerstvem publikovaná čísla ovšem nemusejí být konečná. Změnit se mohou například poté, co své faktury pošlou dopravci, kteří si kompenzace účtují zpětně za období delší než jeden měsíc. Doručené faktury se navíc mohou zpětně měnit, pokud dopravce nebo ministerstvo při kontrole objeví chybu a pošle opravnou či dodatečnou fakturu.

„Také statistické údaje oficiálně publikované ministerstvem dopravy je proto nutné brát jako předběžné. Skutečnost je nakonec zobrazena v otevřených datech (z nichž právě čerpá aplikace iROZHLAS.cz - pozn. red.), ovšem se značným časovým odstupem,“ vysvětluje František Jemelík z ministerstva.

## Důchodci čerpají méně než čtvrtinu slev

[Podle serveru Zdopravy.cz](https://zdopravy.cz/studenti-nebo-duchodci-kolik-stat-utraci-za-levnejsi-cestovani-vybranych-skupin-31098/#comment-110119), který publikoval rozklad v březnu proplacených slev podle jednotlivých zvýhodněných skupin, čerpají většinu žáci a studenti, na seniory připadlo jen necelých 22 procent zlevněných jízd.

Slevy platí na všech vnitrostátních dálkových regionálních autobusových a železničních linkách, v integrovaných dopravních systémech a také na linkách městské hromadné dopravy, které zajíždějí za hranice města. V železniční dopravě platí pouze ve vozech druhé třídy. Podle dopravců se po zavedení slev zvýšil počet cestujících v jednotkách procent.

Ministerstvo dopravy předpokládá, že slevy celkově vyjdou na šest miliard korun ročně. Peníze na slevy obsahuje i návrh státního rozpočtu pro příští rok.
