import { Footer } from 'flowbite-react';

export default function FooterWithLogo() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            alt="Remix Logo"
            href="#"
            name="CCOPA"
            src="favicon.ico"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">
              About
            </Footer.Link>
            <Footer.Link href="#">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="#">
              Licensing
            </Footer.Link>
            <Footer.Link href="#">
              Contact
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          by="CCOPA™"
          href="#"
          year={2023}
        />
      </div>
    </Footer>
  )
}


