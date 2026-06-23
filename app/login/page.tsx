import Card from "@/components/ui/Card"
import Header from "@/components/ui/Header"

export default function LoginPage() {
  return (
    <Card className="w-sm m-auto" style={{ padding: "var(--space-sm)" }}>
      <Header isLoggedIn={false} />
    </Card>
  )
}