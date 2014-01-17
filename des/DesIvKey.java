import java.io.IOException;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class DesIvKey{

	private final static String DES = "DES";
	private final static String CIBDES = "DES/CBC/PKCS5Padding";

	public String iv;
	public String key;
	public String data;

	public DesIvKey(String data , String key , String iv){
		this.iv = iv;
		this.key = key;
		this.data = data;
	};

	/**
	 * Description 根据键值进行加密
	 * @param data 
	 * @param key  加密键byte数组
	 * @return
	 * @throws Exception
	 */
	public static String encrypt(String data, String key , String iv) throws Exception {
		byte[] bt = encrypt(data.getBytes("UTF-8"), key.getBytes("UTF-8") , iv.getBytes("UTF-8"));
		String strs = new BASE64Encoder().encode(bt);
		return strs;
	}

	/**
	 * Description 根据键值进行解密
	 * @param data
	 * @param key  加密键byte数组
	 * @return
	 * @throws IOException
	 * @throws Exception
	 */
	public static String decrypt(String data, String key ,String iv) throws IOException,
			Exception {
		if (data == null)
			return null;
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] buf = decoder.decodeBuffer(data);
		byte[] bt = decrypt(buf,key.getBytes("UTF-8") , iv.getBytes("UTF-8"));
		return new String(bt);
	}

	/**
	 * Description 根据键值进行加密
	 * @param data
	 * @param key  加密键byte数组
	 * @return
	 * @throws Exception
	 */
	private static byte[] encrypt(byte[] data, byte[] key , byte[] iv) throws Exception {
		// 生成一个可信任的随机数源 被IvParameterSpec替代
		//SecureRandom sr = new SecureRandom();

		// 从原始密钥数据创建DESKeySpec对象
		DESKeySpec dks = new DESKeySpec(key);

		// 初始化向量 (IV)。使用 IV 的例子是反馈模式中的密码，如，CBC 模式中的 DES 和使用 OAEP 编码操作的 RSA 密码。
		IvParameterSpec ivs = new IvParameterSpec(iv);

		// 创建一个密钥工厂，然后用它把DESKeySpec转换成SecretKey对象
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);
		SecretKey securekey = keyFactory.generateSecret(dks);

		// Cipher对象实际完成加密操作
		Cipher cipher = Cipher.getInstance(CIBDES);

		// 用密钥初始化Cipher对象
		cipher.init(Cipher.ENCRYPT_MODE, securekey, ivs);

		return cipher.doFinal(data);
	}
	
	
	/**
	 * Description 根据键值进行解密
	 * @param data
	 * @param key  加密键byte数组
	 * @return
	 * @throws Exception
	 */
	private static byte[] decrypt(byte[] data, byte[] key , byte[] iv) throws Exception {
		// 生成一个可信任的随机数源
		//SecureRandom sr = new SecureRandom();

		// 从原始密钥数据创建DESKeySpec对象
		DESKeySpec dks = new DESKeySpec(key);

		// 初始化向量 (IV)。使用 IV 的例子是反馈模式中的密码，如，CBC 模式中的 DES 和使用 OAEP 编码操作的 RSA 密码。
		IvParameterSpec ivs = new IvParameterSpec(iv);

		// 创建一个密钥工厂，然后用它把DESKeySpec转换成SecretKey对象
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);
		SecretKey securekey = keyFactory.generateSecret(dks);

		// Cipher对象实际完成解密操作
		Cipher cipher = Cipher.getInstance(CIBDES);

		// 用密钥初始化Cipher对象
		cipher.init(Cipher.DECRYPT_MODE, securekey, ivs);

		return cipher.doFinal(data);
	}

	public String generateDes(){
		String str = "";
		try{
			str = encrypt(this.data, this.key , this.iv);
		}catch(Exception e){
			e.printStackTrace();
		}
		return str;
	}

	public String deDes(String data){
		String str = "";
		try{
			str = decrypt(data, this.key , this.iv);
		}catch(Exception e){
			e.printStackTrace();
		}
		return str;
	};
	public static void main(String[] args){
		String iv = "qwerasdf";
		String key = "qwerasdf";
		String data = "admin";
		DesIvKey des = new DesIvKey(data , key , iv);
		String str = des.generateDes();
		System.out.println(str);
		System.out.println(des.deDes(str));
	}
}