import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CONTACT } from "@/lib/contact";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">{title}</h3>
      <div className="text-foreground/85 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export function PrivacyModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-[rgba(201,169,97,0.3)] sm:max-w-lg p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-gold text-[10px] tracking-[0.5em] uppercase mb-3 text-center">Rechtliches</div>
          <DialogTitle className="font-display text-3xl text-center tracking-wide">Datenschutz</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-6 text-sm">
          <Section title="Verantwortlicher">
            <p>
              {CONTACT.owner}
              <br />
              {CONTACT.address.street}
              <br />
              {CONTACT.address.zip} {CONTACT.address.city}
              <br />
              Telefon: {CONTACT.phone}
            </p>
          </Section>

          <Section title="Allgemeines">
            <p>
              Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir verarbeiten Daten nur,
              soweit dies für den Betrieb dieser Website und die Kontaktaufnahme erforderlich ist.
            </p>
          </Section>

          <Section title="Reservierung über Instagram">
            <p>
              Wenn Sie über unsere Website eine Reservierung starten, werden Datum, Uhrzeit und
              Personenzahl lokal in Ihrem Browser zu einer Nachricht zusammengestellt. Die
              Übermittlung erfolgt erst, wenn Sie den Instagram-Chat öffnen und die Nachricht dort
              absenden. Wir speichern diese Angaben nicht auf unseren Servern.
            </p>
            <p>
              Für die Kommunikation über Instagram gelten die Datenschutzbestimmungen von Meta
              (Instagram). Weitere Informationen finden Sie in deren Datenschutzerklärung.
            </p>
          </Section>

          <Section title="Google Maps">
            <p>
              Auf unserer Website ist eine Karte von Google Maps eingebunden. Beim Aufruf der Karte
              können Daten (z. B. Ihre IP-Adresse) an Google übertragen werden. Anbieter: Google
              Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
          </Section>

          <Section title="Hosting">
            <p>
              Diese Website wird bei Vercel Inc. gehostet. Beim Besuch der Seite werden technisch
              notwendige Daten (z. B. IP-Adresse, Zeitpunkt des Zugriffs) in Server-Logdateien
              verarbeitet, um die Website bereitzustellen und abzusichern.
            </p>
          </Section>

          <Section title="Schriftarten">
            <p>
              Wir binden Schriftarten lokal über Fontsource ein. Beim Laden der Website werden keine
              Verbindungen zu externen Schriftanbietern aufgebaut.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Diese Website verwendet keine Tracking-Cookies und kein Analyse-Tracking. Es können
              technisch notwendige Daten im Rahmen des Hostings anfallen.
            </p>
          </Section>

          <Section title="Ihre Rechte">
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung und Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten.
              Wenden Sie sich dazu an die oben genannten Kontaktdaten.
            </p>
            <p>
              Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
            </p>
          </Section>

          <p className="text-xs text-muted-foreground/70 pt-4 border-t border-[rgba(201,169,97,0.1)]">
            Stand: {new Date().getFullYear()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}